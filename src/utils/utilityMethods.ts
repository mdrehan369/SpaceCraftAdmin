import { Property } from "@prisma/client";

export function capitalizeFirstLetterOfEachWord(input: string): string {
    return input
        .replaceAll("-", " ")
        .split(" ")
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
}

export const assignPropertyTypeLabel = (property: Property) => {
    switch (property) {
        case Property.ONE_BHK:
            return "1 BHK";
        case Property.TWO_BHK:
            return "2 BHK";
        case Property.THREE_BHK:
            return "3 BHK";
        case Property.FOUR_BHK_OR_DUPLEX:
            return "4 BHK / Duplex";
    }
};


export function convertToReadableDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
}
