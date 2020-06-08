/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import { DropzoneElement } from './styles';

interface DropzoneProps {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileUploaded }) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
    });
    return (
        <DropzoneElement {...getRootProps()}>
            <input {...getInputProps()} />

            {selectedFileUrl ? (
                <img src={selectedFileUrl} alt="Point thumnail" />
            ) : (
                <p>
                    <FiUpload />
                    Imagem do estabelecimento
                    <small>Arraste uma imagem ou clique para selecionar</small>
                </p>
            )}
        </DropzoneElement>
    );
};

export default Dropzone;
