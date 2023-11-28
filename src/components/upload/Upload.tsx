import { useMemo, useState } from 'react';
import './upload.css';
import { useDropzone, FileWithPath } from 'react-dropzone';
import axios from 'axios';
import ReactLoading from 'react-loading'

interface UploadProps {
    setTask: React.Dispatch<React.SetStateAction<number|null>>;
}

export default function Upload({ setTask }: UploadProps) {
    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#818c94d1',
        borderStyle: 'dashed',
        backgroundColor: '#d2d2d2cf',
        color: '#000000',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const [uploadState, setUploadState] = useState<boolean>(false);

    const focusedStyle = {
        borderColor: '#124e78'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };

    const { acceptedFiles, getRootProps,
        getInputProps, isFocused,
        isDragAccept, isDragReject } = useDropzone({
            disabled: uploadState
        });

    const files = acceptedFiles.map((file: FileWithPath) => (
        <li className='list-group-item' key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    const handleUpload = () => {
        if (acceptedFiles.length) {
            console.log("Upload Images", acceptedFiles)
            const formData = new FormData();

            acceptedFiles.map((file) => {
                formData.append('user', 'clinee');
                formData.append('file', file);
            });

            setUploadState(true);

            // setTimeout(()=>{
            //     setTask(111);
            // }, 2000);

            axios.post('http://localhost:8000/upload', formData)
                .then(function (response) {
                    console.log(response.data);
                    setTask(111)
                })
                .catch(function (error) {
                    console.log(error);
                });
            console.log(formData)
        }
        else {
            console.log("No files selected")
        }
    }


    return (
        <div className='d-flex flex-column w-100 p-2 position-relative'>
            <p className='text-center'>Upload sample images here to get the classification result</p>

            <section className="container">
                <div {...getRootProps({ className: 'dropzone', style })}>
                    <input {...getInputProps()} />
                    <p className='m-0'>Drag 'n' drop some files here, or click to select files</p>
                </div>

                <div className='upload-status my-1'>
                    <p className='mx-1'>selected: <span className='status-text'>{files.length + ' files'}</span>,</p>
                    <p className='mx-1'>status: <span className='status-text'>None</span></p>
                </div>
            </section>

            <div className="container">
                <h4>Files list</h4>
            </div>

            <div className='container file-container'>
                <ul className={`file-list rounded-1 list-group list-group-flush 
                ${files.length ? 'file-list-fill' : ''} 
                ${uploadState ? ' disabled':''}`} >
                    {files}
                    <div className={`overlay ${uploadState ? 'show' : ''}`}>
                        <div className="overlay-content">
                            <ReactLoading type="bars" color="#124e78ff"/>
                        </div>
                    </div>
                </ul>

                <button className="upload-button" onClick={handleUpload} disabled={uploadState}>Upload</button>

            </div>

        </div>
    );
}