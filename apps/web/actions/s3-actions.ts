"use server"
import { auth } from "~/auth";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { db } from "@repo/db/db";

const s3client = new S3Client({
    region: process.env.AWS_BUCKET_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    }
});

const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg"
];

const maxFileSize = 1048576 * 50;

type getSignedUrlParams = {
    fileType: string,
    fileSize: number,
};

type signedUrlResponse = Promise<
    {error?: undefined; success: { url: string }} | 
    { error: string; success?: undefined}
>

const generateFileName = (bytes = 32) => {
    const array = new Uint8Array(bytes);
    crypto.getRandomValues(array);
    return [...array].map((b) => b.toString(16).padStart(2, "0")).join("");
}


export const getSignedUrlAction = async ({
    fileType,
    fileSize,
}: getSignedUrlParams): signedUrlResponse => {
    const session = await auth();

    if(!session) {
        return { error: "Not authenticated" }
    };

    if(!allowedFileTypes.includes(fileType)) {
        return { error: "Unsupported file format" }
    };

    if(fileSize > maxFileSize) {
        return { error: "File size too large" }
    };

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: await generateFileName(),
        ContentType: fileType,
        ContentLength: fileSize,
        Metadata: {
            userId: session.user.id!
        }
    });

    try {
        const url = await getSignedUrl(
            s3client,
            putObjectCommand,
            { expiresIn: 60 }
        );

        const user = await db.user.update({
            where: {
                id: session.user.id
            },
            data: {
                image: url.split("?")[0]
            }
        });

        return { success: { url: url}}

    } catch (error) {
        return { error: "Somethign went wrong" }        
    }

};



export const deletePrevImageAction = async () => {
    const session = await auth();

    if(!session) {
        return { error: "Not authenticated" }
    };

    const url = session.user.image;

    if(url === null) {
        return;
    }
    if(!url!.includes("https://blinde-s3-bucket.s3.ap-south-1.amazonaws.com")){
        return;
    }

    if(url && url.includes("https://blinde-s3-bucket.s3.ap-south-1.amazonaws.com")) {
        const key = url.split("/").slice(-1)[0];

        const deleteParams = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key
        };

        try {
            await s3client.send(new DeleteObjectCommand(deleteParams));

            return { success: "Deleted previous profile image"}
        } catch (error) {
            return { error: "Somethign went wrong"}
        }
    }
}

