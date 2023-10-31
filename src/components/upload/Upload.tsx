import { useState, useRef, ChangeEvent } from 'react';
import './upload.css';

export default function Upload() {
    const [file, setFile] = useState<File[]>([]);
    const [dragIsOver, setDragIsOver] = useState(false);
    const click = useRef<HTMLInputElement>(null)

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & {
            files: FileList
        }

        if (target.files && target.files.length) {
            setFile(prev => [...prev, ...Array.from(target.files)])
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        // e.stopPropagation();
        // console.log("DragOver")
        setDragIsOver(true);
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const dropfiles = Array.from(e.dataTransfer.files);
        if (dropfiles.length) {
            setFile(prev => [...prev, ...Array.from(dropfiles)])
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        // console.log("Drag Leave")
        setDragIsOver(false);
    };

    const onButtonClicked = () => {
        console.log("clicked")
        if (click.current) {
            click.current.click();
        }
    }

    return (
        <div className='d-flex flex-column w-100 p-2 position-relative'>
            <p className='text-center'>Upload sample images here to get the classification result</p>
            <div className='list-images'>
            </div>

            <form className='w-80 px-4 text-center'>
                <div className={dragIsOver ? 'draganddrop active' : 'draganddrop'}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}>

                    {
                        dragIsOver ? "You can drop now" : "Drag and drop here"
                    }
                    <br />
                    or
                    <input ref={click} id="input-file-upload" type='file' name="upload" onChange={handleOnChange} multiple={true} />

                    <button className='select-button' onClick={onButtonClicked}>Select File</button>
                </div>

                <input className='upload-input' type='submit' />
            </form>
        </div>
    );
}