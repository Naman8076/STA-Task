
import "./App.css";
import { Button, Table, Modal, Input, Form, Select, DatePicker, Image } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [dataSource, setDataSource]  = useState([
        {
          "studentId": "1",
          "studentName": "John Doe",
          "dateOfBirth": "2000-05-15",
          "gender": "Male",
          "fatherName": "David Doe",
          "motherName": "Emily Doe",
          "emailId": "john.doe@example.com",
          "phoneNumber": "+1 123-456-7890",
          "address": "123 Main Street, Cityville, State, Zipcode",
          "image": "https://loremflickr.com/320/240" 
        },
        {
          "studentId": "2",
          "studentName": "Jane Smith",
          "dateOfBirth": "2001-03-20",
          "gender": "Female",
          "fatherName": "Michael Smith",
          "motherName": "Sarah Smith",
          "emailId": "jane.smith@example.com",
          "phoneNumber": "+1 987-654-3210",
          "address": "456 Elm Avenue, Townsville, State, Zipcode",
          "image": "https://loremflickr.com/320/240"
        },
        {
          "studentId": "3",
          "studentName": "Sam Johnson",
          "dateOfBirth": "2002-09-10",
          "gender": "Male",
          "fatherName": "Robert Johnson",
          "motherName": "Laura Johnson",
          "emailId": "sam.johnson@example.com",
          "phoneNumber": "+1 555-123-4567",
          "address": "789 Oak Road, Villagetown, State, Zipcode",
          "image": "https://loremflickr.com/320/240"
        },
        {
          "studentId": "4",
          "studentName": "Emily Brown",
          "dateOfBirth": "2003-11-05",
          "gender": "Female",
          "fatherName": "James Brown",
          "motherName": "Maria Brown",
          "emailId": "emily.brown@example.com",
          "phoneNumber": "+1 111-222-3333",
          "address": "101 Pine Street, Countryside, State, Zipcode",
          "image": "https://loremflickr.com/320/240" 
        },
        {
          "studentId": "5",
          "studentName": "Michael Davis",
          "dateOfBirth": "2004-07-25",
          "gender": "Male",
          "fatherName": "William Davis",
          "motherName": "Nancy Davis",
          "emailId": "michael.davis@example.com",
          "phoneNumber": "+1 333-444-5555",
          "address": "222 Birch Lane, Suburbia, State, Zipcode",
          "image": "https://loremflickr.com/320/240" 
        }
      ]);
    
      const columns = [
        {
          key: "1",
          title: "ID",
          dataIndex: "studentId",
        },
        {
          key: "2",
          title: "Student Name",
          dataIndex: "studentName",
          render: (text, record) => {
            if (!text) {
              return <span style={{ color: "red" }}>Required</span>;
            }
            return text;
          },
        },
        {
          key: "3",
          title: "Date Of Birth",
          dataIndex: "dateOfBirth",
          render: (text, record) => {
            if (!text) {
              return <span style={{ color: "red" }}>Required</span>;
            }
            // Implement age validation here (e.g., must be greater than 3 years)
            const dob = new Date(text);
            const currentDate = new Date();
            const age = currentDate.getFullYear() - dob.getFullYear();
            if (age < 3) {
              return <span style={{ color: "red" }}>Age must be greater than 3 years</span>;
            }
            return text;
          },
        },
        {
          key: "4",
          title: "Gender",
          dataIndex: "gender",
          render: (text, record) => {
            if (!text) {
              return <span style={{ color: "red" }}>Required</span>;
            }
            return text;
          },
        },
        {
          key: "5",
          title: "Father Name",
          dataIndex: "fatherName",
          render: (text, record) => {
            if (!text) {
              return <span style={{ color: "red" }}>Required</span>;
            }
            return text;
          },
        },
        {
          key: "6",
          title: "Mother Name",
          dataIndex: "motherName",
          render: (text, record) => {
            if (!text) {
              return <span style={{ color: "red" }}>Required</span>;
            }
            return text;
          },
        },
        {
          key: "7",
          title: "Email Id",
          dataIndex: "emailId",
          render: (text, record) => {
            if (!text) {
              return <span style={{ color: "red" }}>Required</span>;
            }
            // Implement email validation here
            const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
            if (!emailPattern.test(text)) {
              return <span style={{ color: "red" }}>Invalid Email</span>;
            }
            return text;
          },
        },
        {
          key: "8",
          title: "Phone Number",
          dataIndex: "phoneNumber",
          render: (text, record) => {
            if (!text) {
              return <span style={{ color: "red" }}>Required</span>;
            }
            return text;
          },
        },
        {
          key: "9",
          title: "Address",
          dataIndex: "address",
          render: (text, record) => {
            if (!text) {
              return <span style={{ color: "red" }}>Required</span>;
            }
            return text;
          },
        },
        {
          key: "10",
          title: "Image",
          dataIndex: "image",
          render: (text, record) => (
            <img src={text} alt={record.studentName} style={{ width: "50px" }} />
          ),
        },
        {
          key: "11",
          title: "Actions",
          render: (record) => {
            return (
              <>
               
                <DeleteOutlined
                   onClick={() => onDeleteStudent(record.studentId)} // Pass studentId to the delete function
                style={{ color: "red", marginLeft: 12 }}
                />
              </>
            );
          },
        },
      ];
    
  const [newStudentForm] = Form.useForm();

  const onAddStudent = () => {
    setIsEditing(true);
  };

  const onDeleteStudent = (studentId) => {
    setDataSource((prevData) => prevData.filter((student) => student.studentId !== studentId));
  };

  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };

  const handleNewStudentSubmit = () => {
    newStudentForm.validateFields().then((values) => {
      const newStudent = { studentId: (Math.random() * 1000).toFixed(0), ...values };
      setDataSource((prevData) => [...prevData, newStudent]);
      setIsEditing(false);
      newStudentForm.resetFields();
    });
  };

  // implement search functinality 
  const [searchQuery, setSearchQuery] = useState(""); // Add state for search query

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  // Filter the data based on the search query
  const filteredDataSource = dataSource.filter((student) =>
    student.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const inputStyle = { maxWidth: "300px", height:"20px", float: "left", // Float the input to the left
  marginRight: "10px",};

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={onAddStudent}>Add a new Student</Button>
        <Input
          placeholder="Search student by name"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          style={inputStyle}
        />
        <Table columns={columns} dataSource={filteredDataSource} />
        <Modal
          title="Add New Student"
          visible={isEditing}
          onCancel={() => setIsEditing(false)}
          onOk={handleNewStudentSubmit}
        >
          <Form form={newStudentForm} name="newStudentForm">
            <Form.Item name="studentName" label="Student Name" rules={[{ required: true, message: "Required" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="dateOfBirth" label="Date of Birth" rules={[{ required: true, message: "Required" }]}>
              <DatePicker />
            </Form.Item>
            <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "Required" }]}>
              <Select>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </Form.Item>
            <Form.Item name="fatherName" label="Father Name" rules={[{ required: true, message: "Required" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="motherName" label="Mother Name" rules={[{ required: true, message: "Required" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="emailId" label="Email" rules={[{ required: true, message: "Required" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: "Required" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address" rules={[{ required: true, message: "Required" }]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </header>
    </div>
  );
}

export default App;
