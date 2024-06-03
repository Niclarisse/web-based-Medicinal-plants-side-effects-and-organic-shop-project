import React, { useState } from "react";
import UploadComponent from "../../../../components/UploadComponent";
import { Button, Form } from "antd";
import { api } from "../../../../utils/helpers";
import { errorHandler, toastMessage } from "../../../../utils/toast";
import { useDispatch } from "react-redux";
import { fetchPlants } from "../../../../redux/slices/plant/plantThunks";
import toast from "react-hot-toast";

const Step3 = ({ id }) => {
  const [fileList, setFileList] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);

  const dispatch = useDispatch();

  const handleFileChange = (newFileList) => {
    setFileList(newFileList);
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      return alert("Please upload an image.");
    }

    setUploadLoading(true);
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    try {
      const response = await api.put(`/plants/upload/${id}`, formData);
      console.log("Upload response:", response.data);
      toastMessage("success", "Plant image uploaded successfully.");
      dispatch(fetchPlants());
      // Move to next step on success
    } catch (error) {
      errorHandler(error);
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <Form.Item
        label="Plant Image"
        name="image"
        rules={[
          {
            required: true,
            message: "Please input plant image!",
          },
        ]}
      >
        <UploadComponent onFileChange={handleFileChange} />
      </Form.Item>
      <Button type="primary" onClick={handleUpload} loading={uploadLoading}>
        Upload and Continue
      </Button>
    </div>
  );
};

export default Step3;
