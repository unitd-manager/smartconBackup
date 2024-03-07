import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
///import message from '../Message';
import api from '../../constants/api';

function ViewFileComponentV2({ moduleId, roomName,update,setUpdate }) {
  ViewFileComponentV2.propTypes = {
    moduleId: PropTypes.string,
    roomName: PropTypes.string,
    update:PropTypes.bool,
    setUpdate:PropTypes.func
  };

  const tableStyle = {};
  const [getFile, setGetFile] = useState(null);

  const getFiles = () => {
    api.post('/file/getListOfFiles', { record_id: moduleId, room_name: roomName }).then((res) => {
      setGetFile(res.data);
    });
  };

  const deleteFile = (fileId, fileName) => {
    const endpoint = fileName ? '/file/deleteFile' : '/file/deleteFileByMediaId';
    Swal.fire({
      title: `Are you sure?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post(endpoint, { media_id: fileId })
          .then((res) => {
            console.log(res);
            Swal.fire('Deleted!', 'Media has been deleted.', 'success');
            setUpdate(!update);
           
          })
          .catch(() => {
            setTimeout(() => {
              window.location.reload();
            }, 300);
          });
      }
    });
  };
  

  useEffect(() => {
    getFiles();
  }, [update]);
  
  useEffect(() => {
    getFiles();
  }, []);

  return (
    <>
      <table style={tableStyle}>
        <thead>
          <tr style={tableStyle}>
            <th style={tableStyle}>File Name</th>
            <th width="5%"></th>
          </tr>
        </thead>
        <tbody>
          {getFile ? (
            getFile.map((res) => {
              return (
                <tr key={res.media_id}>
                    <td style={tableStyle}>
                    <a
                      href={`http://43.228.126.245/smartco-api/storage/uploads/${res.name}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {res.name}
                    </a>
                    {res.img_encode && <img src={`data:image/png;base64,${res.img_encode}`} style={{ maxWidth: '100px' }} alt="" />}
                  </td>
                  <td style={tableStyle}>
                    <button
                      type="button"
                      className="btn shadow-none"
                      onClick={() => {
                        deleteFile(res.media_id,res.name);
                      }}
                    >
                      <Icon.Trash2 />{' '}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>
                <p>no files uploaded yet</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default ViewFileComponentV2;
