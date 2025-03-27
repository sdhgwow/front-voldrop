import PublicOffer from "@/components/Oferta";
import BasePage from "./BasePage";
import { useState } from "react";

function OfertaPage() {

    return (
        <BasePage title={""} desc={""}>
            <PublicOffer />
        </BasePage>
    )
}

export default OfertaPage