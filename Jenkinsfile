pipeline {
  agent any

  stages {
    stage('Checkout Code') {
      steps {
        git branch: 'main', url: 'https://github.com/zainikhan999/DevOps_semester_project'
      }
    }
    stage('Check Docker') {
       steps {
    sh 'which docker || echo "Docker not installed"'
    sh 'docker --version || echo "Docker not working"'
    sh 'docker compose version || echo "Docker Compose not working"'
  }
}

    stage('Setup Environment Variables') {
      steps {
        withCredentials([
          string(credentialsId: 'GEMINI_API_KEY', variable: 'GEMINI_API_KEY'),
          string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
        ]) {
          sh '''
            echo "GENAI_KEY=$GENAI_KEY" > backend/.env
            echo "DB_URI=$DB_URI" >> backend/.env
          '''
        }
      }
    }

    stage('Build Changed Containers') {
      steps {
        script {
          def frontendChanged = sh(script: "git diff --name-only HEAD~1 HEAD | grep '^myapp/' || true", returnStatus: true) == 0
          def backendChanged = sh(script: "git diff --name-only HEAD~1 HEAD | grep '^backend/' || true", returnStatus: true) == 0

          if (frontendChanged) {
            echo 'Changes detected in frontend. Rebuilding...'
            sh 'docker-compose build frontend'
          } else {
            echo 'No changes in frontend.'
          }

          if (backendChanged) {
            echo 'Changes detected in backend. Rebuilding...'
            sh 'docker-compose build backend'
          } else {
            echo 'No changes in backend.'
          }
        }
      }
    }

    stage('Run Containers') {
      steps {
        sh 'docker-compose up -d'
      }
    }

    stage('Test App') {
  steps {
    sh '''
      echo "Checking if frontend container is ready..."
      for i in {1..15}; do
        if docker-compose exec frontend curl -s http://localhost:3000; then
          echo "App is up!"
          break
        else
          echo "Waiting for app to be ready..."
          sleep 2
        fi
      done
    '''
  }
}


  }
}
