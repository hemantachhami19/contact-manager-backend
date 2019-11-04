/**
 * extendTimeoutMiddleware:
 * Sometimes facebook api callback  takes longer time to respond
 * so, Heroku usually suffers request timeout error ie H12 error which is not configurable in heroku.
 * To prevent request timeout error we call this middleware which makes server busy until the response comeback,
 * This middleware is optional for local and aws environment where request timeout is configurable
 */
const extendTimeoutMiddleware = (req, res, next) => {
  const space = ' ';
  let isFinished = false;
  let isDataSent = false;

  res.once('finish', () => {
    isFinished = true;
  });

  res.once('end', () => {
    isFinished = true;
  });

  res.once('close', () => {
    isFinished = true;
  });

  res.on('data', (data) => {
    // Look for something other than our blank space to indicate that real
    if (data !== space) {
      isDataSent = true;
    }
  });

  const waitAndSend = () => {
    setTimeout(() => {
      // If the response hasn't finished and hasn't sent any data back....
      if (!isFinished && !isDataSent) {
        // Need to write the status code/headers if they haven't been sent yet.
        if (!res.headersSent) {
          res.writeHead(202);
        }

        res.write(space);

        // Wait another 15 seconds
        waitAndSend();
      }
    }, 15000);
  };

  waitAndSend();
  next();
};

module.exports = extendTimeoutMiddleware;