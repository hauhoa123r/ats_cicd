pipeline {
    agent any

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
    }
}
