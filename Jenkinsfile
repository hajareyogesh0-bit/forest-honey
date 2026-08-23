stage('Deploy to Kubernetes') {
    steps {
        sh '''
            echo "Deploying Forest Honey to Kubernetes..."

            kubectl set image deployment/forest-honey \
                forest-honey=${DOCKER_IMAGE}:${BUILD_NUMBER}

            kubectl rollout status deployment/forest-honey

            echo "Kubernetes deployment successful!"
        '''
    }
}