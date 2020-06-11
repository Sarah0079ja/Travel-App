import React from 'react'
import Dropzone from 'react-dropzone'
import {FaPlus} from 'react-icons/fa'


function FileUpload() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Dropzone
            onDrop
            multiple
            maxSize>
                {({getRootProps, getInputProps}) => (
                    <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems:'center'}}
                    {...getRootProps()}
                    >
                    <input {...getInputProps()} />
                    <div style ={{ marginLeft:'120px'}}> <FaPlus size= '3rem' color='#007bff' /></div>
                   
                    </div>
                )}
            </Dropzone>
        </div>
    )
}

export default FileUpload