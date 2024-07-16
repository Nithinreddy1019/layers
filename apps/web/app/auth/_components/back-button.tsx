import { Button } from "@repo/ui/components/button"
import Link from "next/link"
import Router from "next/router"

interface BackButtonProps {
    label: string,
    href: string
}

export const BackButton = ({
    href,
    label
}: BackButtonProps) => {
    return (
        <Button
            variant="link"
            size="sm"
            asChild
            className="px-0"
        >
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
}