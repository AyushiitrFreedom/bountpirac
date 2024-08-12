"use client";

import { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { FaTrash } from 'react-icons/fa';

type RejectedFile = {
    file: FileWithPath;
    errors: { code: string; message: string }[];
};

export default function Dropzone({ className }: { className: string }) {
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const [rejected, setRejected] = useState<RejectedFile[]>([]);

    const onDrop = useCallback((acceptedFiles: FileWithPath[], rejectedFiles: RejectedFile[]) => {
        if (acceptedFiles.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles
            ]);
        }

        if (rejectedFiles.length) {
            setRejected(previousFiles => [...previousFiles, ...rejectedFiles]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': []
        },
        maxSize: 1024 * 1000,
        onDrop
    });

    const removeFile = (name: string) => {
        setFiles(files => files.filter(file => file.name !== name));
    };

    const removeAll = () => {
        setFiles([]);
        setRejected([]);
    };

    const removeRejected = (name: string) => {
        setRejected(rejected => rejected.filter(({ file }) => file.name !== name));
    };

    return (
        <form className="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-6 rounded-xl shadow-lg">
            <div
                {...getRootProps({
                    className: `dropzone p-8 border-4 border-dashed border-yellow-300 rounded-xl ${className} bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-md transition-all duration-300 hover:border-green-300 hover:shadow-xl`
                })}
                style={{ minHeight: '200px' }}
            >
                <input {...getInputProps()} />
                <div className='flex flex-col items-center justify-center gap-4'>
                    {isDragActive ? (
                        <p className='text-white text-2xl font-bold animate-bounce'>Drop the files here ...</p>
                    ) : (
                        <p className='text-white text-2xl font-bold'>Drag & drop files here, or click to select files</p>
                    )}
                </div>
            </div>

            <section className='mt-10'>
                <div className='flex gap-4 items-center'>
                    <h2 className='text-3xl font-extrabold text-white drop-shadow-lg'>File List</h2>
                    <button
                        type='button'
                        onClick={removeAll}
                        className='mt-1 text-[12px] uppercase tracking-wider font-bold text-yellow-300 border-2 border-yellow-300 rounded-full px-4 py-2 hover:bg-yellow-300 hover:text-purple-600 transition-all duration-300'
                    >
                        Remove all files
                    </button>
                </div>

                <h3 className='text-lg font-semibold text-yellow-300 mt-10 border-b border-yellow-300 pb-3'>
                    Accepted Files
                </h3>
                <ul className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {files.map(file => (
                        <li key={file.name} className='flex items-center justify-between p-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg transition-all duration-300 hover:bg-opacity-30'>
                            <p className='text-white text-sm font-medium truncate'>
                                {file.name}
                            </p>
                            <button
                                type='button'
                                className='text-red-400 hover:text-red-600 transition-colors duration-300 transform hover:scale-110'
                                onClick={() => removeFile(file.name)}
                            >
                                <FaTrash />
                            </button>
                        </li>
                    ))}
                </ul>

                <h3 className='text-lg font-semibold text-red-300 mt-24 border-b border-red-300 pb-3'>
                    Rejected Files
                </h3>
                <ul className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {rejected.map(({ file, errors }) => (
                        <li key={file.name} className='flex flex-col p-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg transition-all duration-300 hover:bg-opacity-30'>
                            <div className="flex items-center justify-between">
                                <p className='text-white text-sm font-medium truncate'>
                                    {file.name}
                                </p>
                                <button
                                    type='button'
                                    className='text-red-400 hover:text-red-600 transition-colors duration-300 transform hover:scale-110'
                                    onClick={() => removeRejected(file.name)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                            <ul className='text-[12px] text-red-300 mt-2'>
                                {errors.map(error => (
                                    <li key={error.code}>{error.message}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </section>
        </form>
    );
}