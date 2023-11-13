import { useState, useRef, ChangeEvent, DragEvent, FormEvent } from 'react';
import './upload.css';

export default function Upload() {
    const [file, setFile] = useState<File[]>([]);
    const [dragIsOver, setDragIsOver] = useState(false);
    const click = useRef<HTMLInputElement>(null)

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragIsOver(true);
    }

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragIsOver(false);
    };
    
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragIsOver(false);

        const dropfiles = Array.from(e.dataTransfer.files);
        console.log(dropfiles)

        if (dropfiles.length) {
            setFile(prev => [...prev, ...Array.from(dropfiles)])
        }

    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement & {
            files: FileList
        }

        if (target.files && target.files.length) {
            setFile(prev => [...prev, ...Array.from(target.files)])
        }
    }

    const onButtonClicked = () => {
        if (click.current) {
            click.current.click();
        }
    }

    const handleSubmit = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(file);
    }

    return (
        <div className='d-flex flex-column w-100 p-2 position-relative'>
            <p className='text-center'>Upload sample images here to get the classification result</p>
            <div className='list-images'>
            </div>

            <form className='w-80 px-4 text-center'>
                <div className={dragIsOver ? 'draganddrop active' : 'draganddrop'}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    >

                    {
                        dragIsOver ? "You can drop now" : "Drag and drop here"
                    }
                    <br />
                    or
                    <input ref={click} id="input-file-upload" type='file' name="upload" onChange={handleOnChange} multiple={true} />

                    <button className='select-button' onClick={onButtonClicked}>Select File</button>
                </div>

                <input className='upload-input' type='submit'/>
            </form>
        </div>
    );
}