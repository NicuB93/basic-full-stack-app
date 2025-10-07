#!/bin/bash

# Quick Launch Script for Full-Stack Application
# This script will set up and start both backend and frontend servers

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_info() {
    echo -e "${BLUE}ℹ ${1}${NC}"
}

print_success() {
    echo -e "${GREEN}✓ ${1}${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ ${1}${NC}"
}

print_error() {
    echo -e "${RED}✗ ${1}${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js v20 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    print_error "Node.js version must be 20 or higher. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js $(node -v) detected"

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BACKEND_DIR="$SCRIPT_DIR/backend-nest"
FRONTEND_DIR="$SCRIPT_DIR/frontend-next"

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Check if required ports are available
print_info "Checking ports availability..."
if check_port 8080; then
    print_warning "Port 8080 is already in use. Backend may already be running."
fi
if check_port 3000; then
    print_warning "Port 3000 is already in use. Frontend may already be running."
fi

# Setup Backend
print_info "Setting up backend..."
cd "$BACKEND_DIR"

if [ ! -d "node_modules" ]; then
    print_info "Installing backend dependencies..."
    npm install
    print_success "Backend dependencies installed"
else
    print_success "Backend dependencies already installed"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found in backend. Creating from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_success "Created .env file. Please update it with your configuration."
    else
        print_error ".env.example not found. Please create .env manually."
    fi
fi

# Generate Prisma Client
print_info "Generating Prisma Client..."
npx prisma generate > /dev/null 2>&1
print_success "Prisma Client generated"

# Setup Frontend
print_info "Setting up frontend..."
cd "$FRONTEND_DIR"

if [ ! -d "node_modules" ]; then
    print_info "Installing frontend dependencies..."
    npm install
    print_success "Frontend dependencies installed"
else
    print_success "Frontend dependencies already installed"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found in frontend. Creating from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_success "Created .env file. Please update it with your configuration."
    else
        print_error ".env.example not found. Please create .env manually."
    fi
fi

# Generate API client
print_info "Generating API client..."
npm run generate > /dev/null 2>&1 || print_warning "API client generation skipped (backend may need to be running)"

# Start the servers
print_success "Setup complete! Starting servers..."
echo ""
print_info "Backend will start on: http://localhost:8080"
print_info "Frontend will start on: http://localhost:3000"
print_info "API Documentation: http://localhost:8080/api-docs"
echo ""
print_warning "Press Ctrl+C to stop all servers"
echo ""

# Function to handle cleanup on exit
cleanup() {
    echo ""
    print_info "Shutting down servers..."
    kill $(jobs -p) 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start backend in background
cd "$BACKEND_DIR"
print_info "Starting backend server..."
npm run start:dev 2>&1 | while IFS= read -r line; do
    echo -e "${BLUE}[Backend]${NC} $line"
done &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3
print_success "Backend server started"

# Start frontend in background
cd "$FRONTEND_DIR"
print_info "Starting frontend server..."
npm run dev 2>&1 | while IFS= read -r line; do
    echo -e "${GREEN}[Frontend]${NC} $line"
done &
FRONTEND_PID=$!

# Wait a bit for frontend to start
sleep 3
print_success "Frontend server started"

echo ""
print_success "✨ Both servers are running!"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
