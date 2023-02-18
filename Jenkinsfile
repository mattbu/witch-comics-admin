agent {
    label ‘main-host’
}
node {
  stage('========== Clone repository ==========') {
 
      git credentialsId: 'hwangdaeho', url: 'https://bitbucket.org/m-ultiply-admin/witch_comics_admin'

  }
  stage('========== Build image ==========') {
    app = docker.build("ghkdeogh/witch-admin")
  }
  stage('========== Push image ==========') {
    docker.withRegistry('https://registry.hub.docker.com', 'ghkdeogh') {
      app.push("${env.BUILD_NUMBER}")
      app.push("latest")
    }
     echo 'Push..'
  }

  stage('========== Pull image ==========') {
    echo 'Pull..'
  script {
      sshPublisher(
       continueOnError: false, failOnError: true,
       publishers: [
        sshPublisherDesc(
         configName: "witch-admin-front-ssh",
         verbose: true,
         transfers: [
          sshTransfer(
           execCommand: "cd compose && docker image prune -f && docker-compose pull && docker-compose down && docker-compose up -d"
          )
         ])
       ])
 }
 
  }
}