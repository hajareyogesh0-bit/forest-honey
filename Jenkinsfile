pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'yogesh0730/forest-honey'
    }

    stages {

        stage('Docker Build') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} .'
            }
        }

        stage('Docker Test') {
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

        stage('Docker Push') {
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
    }

    post {
        success {
            echo 'Forest Honey CI pipeline completed successfully!'
        }

        failure {
            echo 'Forest Honey pipeline failed!'
        }
    }
}