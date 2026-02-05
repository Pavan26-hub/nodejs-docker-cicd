pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    environment {
        IMAGE_NAME = "nodejs-cicd-app"
        IMAGE_TAG  = "latest"
        DEPLOY_HOST = "3.147.69.45"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['bf3b89fe-f9bc-46f0-9f69-fe239759eed7']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@$3.147.69.45 << EOF
                      docker stop nodejs-app || true
                      docker rm nodejs-app || true
                      docker run -d -p 3000:3000 --name nodejs-app $IMAGE_NAME:$IMAGE_TAG
                    EOF
                    '''
                }
            }
        }
    }
}

