```groovy
pipeline {
    agent any

    environment {
        SERVER_IP = "18.143.179.208"
        DEPLOY_PATH = "/home/ats_cicd"
    }

    stages {
        stage('CHECK_ENVIRONMENT') {
            steps {
                sh 'echo "User: $(whoami)"'
                sh 'echo "Workspace: $(pwd)"'
                sh 'git --version'
                sh 'docker --version'
                sh 'docker compose version'
            }
        }

        stage('CHECK_SOURCE') {
            steps {
                sh 'test -d ats_be'
                sh 'test -d ats_fe'
                sh 'test -d ats_db'
                sh 'test -f docker-compose.yml'
                sh 'echo "Source code is valid"'
            }
        }

        stage('BUILD_IMAGE') {
            steps {
                sh 'docker compose build'
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
                    sh 'echo "$DOCKER_TOKEN" | docker login --username "$DOCKER_USERNAME" --password-stdin'
                    sh 'docker compose push'
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
                        sh 'chmod 600 "$SSH_KEY"'

                        sh 'mkdir -p "$HOME/.ssh"'

                        sh 'chmod 700 "$HOME/.ssh"'

                        sh 'ssh-keyscan -H "$SERVER_IP" >> "$HOME/.ssh/known_hosts"'

                        sh 'ssh -i "$SSH_KEY" "$SSH_USER@$SERVER_IP" "echo SSH connection successful"'

                        sh 'ssh -i "$SSH_KEY" "$SSH_USER@$SERVER_IP" "test -d \'$DEPLOY_PATH\'"'

                        sh 'ssh -i "$SSH_KEY" "$SSH_USER@$SERVER_IP" "cd \'$DEPLOY_PATH\' && pwd"'

                        sh 'ssh -i "$SSH_KEY" "$SSH_USER@$SERVER_IP" "cd \'$DEPLOY_PATH\' && test -f docker-compose.yml"'

                        sh 'ssh -i "$SSH_KEY" "$SSH_USER@$SERVER_IP" "cd \'$DEPLOY_PATH\' && test -f .env"'

                        sh 'ssh -i "$SSH_KEY" "$SSH_USER@$SERVER_IP" "cd \'$DEPLOY_PATH\' && docker compose --env-file .env pull"'

                        sh 'ssh -i "$SSH_KEY" "$SSH_USER@$SERVER_IP" "cd \'$DEPLOY_PATH\' && docker compose --env-file .env up -d"'

                        sh 'ssh -i "$SSH_KEY" "$SSH_USER@$SERVER_IP" "cd \'$DEPLOY_PATH\' && docker compose --env-file .env ps"'
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
```
