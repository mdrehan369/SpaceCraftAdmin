import { Property } from "@prisma/client";
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

export const Properties = [
    {
        label: "1BHK",
        value: Property.ONE_BHK
    },
    {
        label: "2BHK",
        value: Property.TWO_BHK
    },
    {
        label: "3BHK",
        value: Property.THREE_BHK
    },
    {
        label: "4BHK/Duplex",
        value: Property.FOUR_BHK_OR_DUPLEX
    }
]

export const Cities = [
    "BOKARO",
    "DEOGHAR",
    "DHANBAD",
    "EAST_SINGHBHUM",
    "GIRIDIH",
    "HAZARIBAGH",
    "KODARMA",
    "RAMGARH",
    "RANCHI",
    "SARAIKELA",
    "WEST_SINGHBHUM",
    "OTHERS",
]