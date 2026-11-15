"use client";
import dynamic from "next/dynamic";

/* The booking wizard depends on today's date, so it renders in the browser
   only; a build-time render would be stale by the time a guest opens it. */
const RezPage = dynamic(() => import("./rez-page"), { ssr: false });

export default function RezClient() {
  return <RezPage />;
}
