import React from 'react';

function Certificate({ playerName, score, total, date, onDownload }) {
  const percentage = Math.round((score / total) * 100);
  
  const generateCertificate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 800);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 800);

    // White certificate area
    ctx.fillStyle = 'white';
    ctx.fillRect(50, 50, 1100, 700);

    // Border
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 10;
    ctx.strokeRect(70, 70, 1060, 660);

    // Inner border
    ctx.strokeStyle = '#764ba2';
    ctx.lineWidth = 3;
    ctx.strokeRect(85, 85, 1030, 630);

    // Title
    ctx.fillStyle = '#667eea';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF ACHIEVEMENT', 600, 180);

    // Subtitle
    ctx.font = '30px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText('This is to certify that', 600, 260);

    // Name
    ctx.font = 'bold 50px Arial';
    ctx.fillStyle = '#333';
    ctx.fillText(playerName, 600, 340);

    // Achievement text
    ctx.font = '28px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText('has successfully completed the BrainBurst Quiz', 600, 410);
    ctx.fillText(`with an outstanding score of`, 600, 460);

    // Score
    ctx.font = 'bold 70px Arial';
    ctx.fillStyle = '#667eea';
    ctx.fillText(`${percentage}%`, 600, 550);

    // Details
    ctx.font = '22px Arial';
    ctx.fillStyle = '#999';
    ctx.fillText(`Score: ${score}/${total} questions`, 600, 610);
    ctx.fillText(`Date: ${date}`, 600, 645);

    // Signature line
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(400, 690);
    ctx.lineTo(800, 690);
    ctx.stroke();

    ctx.font = '18px Arial';
    ctx.fillStyle = '#999';
    ctx.fillText('BrainBurst Quiz Platform', 600, 710);

    // Download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `BrainBurst_Certificate_${playerName}_${Date.now()}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <button 
      onClick={generateCertificate}
      style={{
        padding: '15px 30px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'transform 0.2s'
      }}
      onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
      onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
    >
      🏆 Download Certificate
    </button>
  );
}

export default Certificate;
