// Force production update marker - ensures deployment picks up changes
export const PRODUCTION_VERSION = "3.0.1";
export const DEPLOYMENT_TIMESTAMP = new Date().toISOString();

console.log(`🚀 Production version ${PRODUCTION_VERSION} initialized at ${DEPLOYMENT_TIMESTAMP}`);