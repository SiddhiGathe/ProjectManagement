package com.project.repository;

import com.project.modal.Project;
import com.project.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project,Long> {
    //List<Project>findByOwner(User user);
    List<Project>findByNameContainingAndTeamContains(String partialName,User user);
   // @Query("select p from project p join p.team t where t=:user")
    //List<Project>findProjectByTeam(@Param("user")User user);
    List<Project>findByTeamContainingOrOwner(User user,User owner);
}
