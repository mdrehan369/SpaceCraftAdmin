import { Headset, LayoutDashboard, MessageCircle, Palette, Target } from "lucide-react";

export const menuItems = [
    {
        label: "Dashboard",
        href: "/",
        icon: LayoutDashboard
    },
    {
        label: "Designs",
        href: "/designs",
        icon: Palette
    },
    {
        label: "Reviews",
        href: "/reviews",
        icon: MessageCircle
    },
    {
        label: "Projects",
        href: "/projects",
        icon: Target
    },
    {
        label: "Consultations",
        href: "/consultations",
        icon: Headset
    },
];


export const Categories = [
    'Dining Room',
    'Bedroom',
    'Living Room',
    '3BHK',
    'Modular Kitchen',
    'Kids Bedroom',
    '1BHK',
    '2BHK',
    'Home Office'
] as const