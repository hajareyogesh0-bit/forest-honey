pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'yogesh0730/forest-honey'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build \
                        -t ${DOCKER_IMAGE}:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Test Container') {
            steps {
                sh '''
                    docker rm -f forest-honey-test || true

                    docker run -d \
                        --name forest-honey-test \
                        -p 8082:80 \
                        ${DOCKER_IMAGE}:${BUILD_NUMBER}

                    sleep 5

                    curl -f http://localhost:8082

                    docker rm -f forest-honey-test
                '''
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login \
                            -u "$DOCKER_USERNAME" \
                            --password-stdin

                        docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                     echo "Deploying Forest Honey to Kubernetes..."

                     export KUBECONFIG=/etc/rancher/k3s/k3s.yaml

                     kubectl set image deployment/forest-honey \
                     forest-honey=${DOCKER_IMAGE}:${BUILD_NUMBER}

                     kubectl rollout status deployment/forest-honey

                     echo "Kubernetes deployment successful!"
                   '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline completed successfully!'
        }

        failure {
            echo 'CI/CD Pipeline failed!'
        }
    }
}
