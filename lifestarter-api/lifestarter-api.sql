\echo "Delete and recreate lifestarter_api db?"
\prompt "Return for yes or control-C to cancel >" answer

DROP DATABASE lifestarter_api;
CREATE DATABASE lifestarter_api;
\connect lifestarter_api;

\i lifestarter-api-schema.sql