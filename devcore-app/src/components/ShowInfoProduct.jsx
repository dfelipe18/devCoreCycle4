import * as React from "react";
import { useParams } from "react-router-dom";

export default function ShowInfoProduct() {

    let {productId} = useParams();

    return (
        <div className="container-info-product">
            <h1>Holi {productId}</h1>
        </div>
    );
}