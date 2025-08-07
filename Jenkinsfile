pipeline {
  agent {
    docker {
      image 'node:18' // Use official Node.js image
      args '-u root:root' // So it can install packages globally if needed
    }
  }

  environment {
    NEXT_TELEMETRY_DISABLED = "1"
    NODE_ENV = "production"
  }

  stages {
    stage('Checkout Code') {
      steps {
        git 'https://github.com/VedantBhawsar/anime-streaming.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Archive Build Output') {
      steps {
        archiveArtifacts artifacts: '.next/**', fingerprint: true
      }
    }
  }

  post {
    success {
      echo '✅ Build successful!'
    }
    failure {
      echo '❌ Build failed.'
    }
  }
}
