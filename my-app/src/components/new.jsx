import { useEffect } from "react";

useEffect(() => {
    const fetchData = async () => {
        const res = await fetch("http://localhost:3000");
        if(!res.ok){
            throw new Error("req failed");
        }

        const data = await res.json();
        setProducts(data.data)
    }

    fetchData();
},[])



useEffect(() => {
    fetch("http://localhost:3000")
    .then((res) => {
        if(!res.ok) throw new Error("req failed")
        return res.json();
    })
    .then(data => setProducts(data));
},[])