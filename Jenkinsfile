pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out Forest Honey source code'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t forest-honey:${BUILD_NUMBER} .'
            }
        }

        stage('Docker Test') {
            steps {
                sh '''
                    docker rm -f forest-honey-test || true

                    docker run -d \
                        --name forest-honey-test \
                        -p 8082:80 \
                        forest-honey:${BUILD_NUMBER}

                    sleep 5

                    curl -f http://localhost:8082

                    docker rm -f forest-honey-test
                '''
            }
        }
    }

    post {
        success {
            echo 'Forest Honey pipeline completed successfully!'
        }

        failure {
            echo 'Forest Honey pipeline failed!'
        }
    }
}