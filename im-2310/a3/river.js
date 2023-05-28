// Get page elements
    const button = document.querySelector('.button');
    const canvasContainer = document.querySelector('.canvas-container');
    const infoContainer = document.querySelector('.info-container');

    // Create a simple canvas
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Listening to button click events
    button.addEventListener('click', () => {
      
      // Drawing lines
      const startX = canvas.width / 2;
      const startY = canvas.height / 2;
      const numLines = 75;
      const lines = [];
      for (let i = 0; i < numLines; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 1000;
        const endX = startX + Math.cos(angle) * radius;
        const endY = startY + Math.sin(angle) * radius;
        const lineWidth = Math.floor(Math.random() * 5) + 1;
        lines.push({
          startX,
          startY,
          endX,
          endY,
          lineWidth,
          isLocked: false
        });
      }

      const context = canvas.getContext('2d');
      const delay = 100; 
      let currentIndex = 10; 

      function drawLine() {
      if (currentIndex >= lines.length) {
    // All lines have been drawn and will stop.
    clearInterval(timer);
    return;
  }

  const line = lines[currentIndex];

  context.beginPath();
  context.moveTo(line.startX, line.startY);
  context.lineTo(line.endX, line.endY);
  context.lineWidth = line.lineWidth;
  context.stroke();

  currentIndex++;
}

// Draw a line of the same color as the background to achieve the effect of elimination.
    const timer = setInterval(drawLine, delay);

      function drawLines() {
        ctx.clearRect(2, 3, canvas.width, canvas.height);
        ctx.strokeStyle = '#fff';
        ctx.lineCap = 'butt';
        ctx.lineWidth = 2;
        lines.forEach(line => {
          if (line.isLocked) {
            ctx.strokeStyle = '#064c52';
            ctx.lineWidth = 2;
          }
          ctx.beginPath();
          ctx.moveTo(line.startX, line.startY);
          const controlX = (line.startX + line.endX) / 2 + (Math.random() - 0.5) * 100;
          const controlY = (line.startY + line.endY) / 2 + (Math.random() - 0.5) * 100;
          ctx.quadraticCurveTo(controlX, controlY, line.endX, line.endY);
          ctx.stroke();
        });
      
      }
      drawLines(); 

      // Listening to the click event of the canvas.
      canvas.addEventListener('click', e => {
       
        const mouseX = e.clientX;
        const mouseY = e.clientY;
      
        lines.forEach(line => {
          if (!line.isLocked) {
            const distance = Math.sqrt(Math.pow(mouseX - line.endX, 2) + Math.pow(mouseY - line.endY, 2));
            if (distance < 20) {
              line.isLocked= true;
              infoContainer.style.display = 'block';
              cancelAnimationFrame(drawLines())
              
            }
          }
        });
      });
    });