import { 
    Card,
    CardHeader,
    CardContent 
} from "@repo/ui/components/card"


interface ProfileCardWrapperProps {
    cardHeader: string,
    cardSubHeader: string,
    children: React.ReactNode
}


export const ProfileCardWrapper = ({
    cardHeader,
    cardSubHeader,
    children
}: ProfileCardWrapperProps) => {
    return (
        <Card className="border-none bg-transparent">
            <CardHeader>
                <div className="flex flex-col items-start gap-y-1">
                    <h1 className="text-2xl font-medium">{cardHeader}</h1>
                    <p className="text-sm font-medium">{cardSubHeader}</p>
                </div>
            </CardHeader>
            <CardContent className="sm:w-2/3 md:w-[50%]">
                {children}
            </CardContent>
        </Card>
    )
}