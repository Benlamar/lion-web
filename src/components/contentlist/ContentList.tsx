
import { Suspense, useState, useEffect } from "react";
import axios from 'axios';
import Loading from "../loading/Loading";

interface ContentProps {
    task: number;
}

function wrapPromise<T>(promise: Promise<T>) {
    let status = 'pending';
    let result: T;
    let suspender = promise.then(
        data => {
            status = 'success';
            result = data;
        },
        error => {
            status = 'error';
            result = error;
        }
    );

    return {
        read() {
            if (status === 'pending') {
                throw suspender;
            } else if (status === 'error') {
                throw result;
            } else if (status === 'success') {
                return result;
            }
        },
    };
}

function fetchTask(task:number) {
    return wrapPromise(axios.get("http://127.0.0.1:8000/task/" + task));
}

export default function ContentList({ task }: ContentProps) {
    const [data, setData] = useState("Hello loading")  

    useEffect(()=>{
        console.log("task id: ",task)
        const response = fetchTask(task);
        console.log("Response for task", response)
        
    },[]);

    return (
        <Suspense fallback={<Loading/>}>
            <div>{data}</div>
        </Suspense>
    );
}