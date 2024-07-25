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
        <Card className="border-none bg-transparent h-full">
            <CardHeader>
                <div className="flex flex-col items-start gap-y-1">
                    <h1 className="text-2xl font-medium">{cardHeader}</h1>
                    <p className="text-sm font-medium">{cardSubHeader}</p>
                </div>
            </CardHeader>
            <CardContent className="max-w-xl space-y-4">
                {children}
            </CardContent>
        </Card>
    )
}