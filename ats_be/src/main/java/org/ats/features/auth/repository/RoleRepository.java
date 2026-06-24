package org.ats.features.auth.repository;

import org.ats.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>
{
    List<Role> findByUsers_Email(String email);
}
