import React from "react";

export interface PendingApplicationProps {
    volunteerName: string;
    location: string;
    email: string;
    phoneNumber: string;
    opportunityTitle: string;
    children?: React.ReactNode;
}