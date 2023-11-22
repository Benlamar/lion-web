import { useState, useMemo } from 'react';
import './upload.css';
import { useDropzone, FileWithPath } from 'react-dropzone';

export default function Upload() {
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
        isDragAccept, isDragReject } = useDropzone();

    const files = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
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


    return (
        <div className='d-flex flex-column w-100 p-2 position-relative'>
            <p className='text-center'>Upload sample images here to get the classification result</p>

            <section className="container">
                <div {...getRootProps({ className: 'dropzone', style })}>
                    <input {...getInputProps()} />
                    <p className='m-0'>Drag 'n' drop some files here, or click to select files</p>
                </div>
            </section>

            <div className='file-list'>
                <h4>Files list</h4>
                <ul>
                    {files}
                </ul>
            </div>

        </div>
    );
}