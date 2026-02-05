pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    environment {
        IMAGE_NAME = "nodejs-cicd-app"
        IMAGE_TAG  = "latest"
        DEPLOY_HOST = "<DEPLOYMENT_PUBLIC_IP>"
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
                sshagent(['deployment-ssh']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@$DEPLOY_HOST << EOF
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

