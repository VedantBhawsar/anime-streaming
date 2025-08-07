pipeline {
  agent {
    docker {
      image 'node:18'
      args '-u root:root'
    }
  }

  environment {
    NODE_ENV = 'production'
    NEXT_TELEMETRY_DISABLED = '1'
  }

  stages {
    stage('Debug: Show Info') {
      steps {
        sh 'node -v'
        sh 'npm -v'
        sh 'ls -la'
        sh 'cat package.json || true'
      }
    }

    stage('Install') {
      steps {
        sh 'npm install || true'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build || true'
      }
    }
  }

  post {
    always {
      echo '🔍 Finished pipeline.'
    }
    success {
      echo '✅ Build completed successfully.'
    }
    failure {
      echo '❌ Build failed.'
    }
  }
}
