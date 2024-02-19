"use client";

import { NotificationProvider } from "../components/ui/NotificationProvider";

export function Providers({ children }) {
	return <NotificationProvider>{children}</NotificationProvider>;
}
