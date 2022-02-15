const jwtSecret = process.env.JWT_SECRET || 'default-jwt-secret';
const refreshSecret = process.env.REFRESH_SECRET || 'default-refresh-secret';
const jwtDuration = process.env.JWT_DURATION || '10s';
const refreshDuration = process.env.REFRESH_DURATION || '30s';

export {  
  jwtSecret,
  refreshSecret,
  jwtDuration,
  refreshDuration
}