import React from "react";

export default function EditEventPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  return <div>EditEventPage {params.id}</div>;
}
