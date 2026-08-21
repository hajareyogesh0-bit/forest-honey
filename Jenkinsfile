stage('Deploy') {
    steps {
        sh '''
            echo "Deploying Forest Honey..."

            docker pull ${DOCKER_IMAGE}:${BUILD_NUMBER}

            docker stop forest-honey || true
            docker rm forest-honey || true

            docker run -d \
                --name forest-honey \
                -p 8081:80 \
                ${DOCKER_IMAGE}:${BUILD_NUMBER}

            sleep 5

            curl -f http://localhost:8081

            echo "Forest Honey deployed successfully!"
        '''
    }
}