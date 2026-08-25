pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'yogesh0730/forest-honey'
        IMAGE_TAG    = '1'
    }

    stages {

        stage('Pull Docker Image') {
            steps {
                sh '''
                    echo "Pulling Docker image..."

                    docker pull ${DOCKER_IMAGE}:${IMAGE_TAG}
                '''
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                    docker stop forest-honey || true
                    docker rm forest-honey || true
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                    echo "Starting application..."

                    docker run -d \
                        --name forest-honey \
                        -p 8081:80 \
                        ${DOCKER_IMAGE}:${IMAGE_TAG}
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 5

                    curl -f http://localhost:8081

                    echo "Application is running successfully!"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully!'
        }

        failure {
            echo 'Deployment failed!'
        }
    }
}