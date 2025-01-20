import React from 'react';
import { Card, List } from 'antd';
import GenericLayout from '../../../components/layouts/genericLayout';

const StudentDashboard: React.FC = () => {
  const certificates = [
    { id: 1, title: 'Blockchain Certification', issuer: 'ABC University', date: '2025-01-01' },
    { id: 2, title: 'Web Development', issuer: 'XYZ Academy', date: '2024-12-15' },
  ];

  return (
    <GenericLayout noFooter>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
        <Card className="shadow-md">
          <h2 className="text-xl font-semibold mb-3">Your Certificates</h2>
          <List
            dataSource={certificates}
            renderItem={(cert) => (
              <List.Item>
                <div className="flex justify-between w-full">
                  <span>{cert.title}</span>
                  <span>{cert.issuer}</span>
                  <span>{cert.date}</span>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </GenericLayout>
  );
};

export default StudentDashboard;
