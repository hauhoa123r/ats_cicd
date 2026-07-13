pipeline {
    agent any

    environment {
        SERVER_IP = "18.143.179.208"
        DEPLOY_PATH = "/home/ats_cicd"
    }

    stages {
        stage('CHECK_ENVIRONMENT') {
            steps {
                sh '''
                    echo "User: $(whoami)"
                    echo "Workspace: $(pwd)"

                    git --version
                    docker --version
                    docker compose version
                '''
            }
        }

        stage('CHECK_SOURCE') {
            steps {
                sh '''
                    test -d ats_be
                    test -d ats_fe
                    test -d ats_db
                    test -f docker-compose.yml

                    echo "Source code is valid"
                '''
            }
        }

        stage('BUILD_IMAGE') {
            steps {
                sh '''
                    docker compose build
                '''
            }
        }

        stage('PUSH_IMAGE') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_TOKEN" | docker login \
                            --username "$DOCKER_USERNAME" \
                            --password-stdin

                        docker compose push
                    '''
                }
            }
        }

        stage('CONNECT_SERVER') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    withCredentials([
                        sshUserPrivateKey(
                            credentialsId: 'azure-server-ssh',
                            keyFileVariable: 'SSH_KEY',
                            usernameVariable: 'SSH_USER'
                        )
                    ]) {
                        sh '''
                            chmod 600 "$SSH_KEY"
                            install -d -m 700 "$HOME/.ssh"

                            ssh \
                                -o BatchMode=yes \
                                -o ConnectTimeout=15 \
                                -o StrictHostKeyChecking=accept-new \
                                -i "$SSH_KEY" \
                                "$SSH_USER@$SERVER_IP" \
                                "cd '$DEPLOY_PATH' &&
                                 test -f docker-compose.yml &&
                                 test -f .env &&
                                 docker compose --env-file .env pull &&
                                 docker compose --env-file .env up -d &&
                                 docker compose --env-file .env ps"
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'DEPLOY SUCCESSFULLY'
        }

        failure {
            echo 'PIPELINE FAILED'
        }

        always {
            sh 'docker logout || true'
        }
    }
}
