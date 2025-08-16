import type { LucideProps } from "lucide-react"

export type NavigationType = {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    label: string,
    path: string,
    active?: boolean
}