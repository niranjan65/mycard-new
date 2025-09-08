import { Callout } from "@radix-ui/themes";
import clsx from "clsx";
import { PropsWithChildren } from "react";


export const CustomCallout = ({
    rootProps,
    iconProps,
    textProps,
    textChildren,
    iconChildren,
}) => {
    return (
        <Callout.Root {...rootProps} className={clsx("animate-fadein", rootProps?.className)}>
            <Callout.Icon {...iconProps}>{iconChildren}</Callout.Icon>
            <Callout.Text {...textProps}>{textChildren}</Callout.Text>
        </Callout.Root>
    );
};

