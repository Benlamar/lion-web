import ContentList from "../contentlist/ContentList";
import Loading from "../loading/Loading";
import Upload from "../upload/Upload";
import { Suspense, useState, useEffect } from "react";


export default function Dashboard() {
    const [task, setTask] = useState<number|null>(null);

    return (
        <div className="container">
            <h1 className="text-center mt-2">Dashboard</h1>
            {
                task ?
                    <ContentList task={task}/>
                    :
                    <Upload setTask={setTask} />
            }
        </div>
    )
}