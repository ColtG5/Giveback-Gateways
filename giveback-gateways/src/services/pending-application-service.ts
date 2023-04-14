import React from "react";

export interface PendingApplicationProps {
    location: string;
    email: string;
    phoneNumber: string;
    opportunityTitle: string;
    children?: React.ReactNode;
}