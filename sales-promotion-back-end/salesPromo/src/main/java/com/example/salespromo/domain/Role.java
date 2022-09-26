package com.example.salespromo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private long roleId;

    private String description;
    private String code;

    @ManyToMany(mappedBy = "roles")
    @JsonIgnoreProperties("roles")
    private Set<User> users = new HashSet<>();

    public Role(){}

    public Role(long roleId, String description, String code){
        this.roleId = roleId;
        this.description = description;
        this.code = code;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public long getRoleId() {
        return roleId;
    }

    public void setRoleId(long roleId) {
        this.roleId = roleId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public boolean equals(Object other){
        boolean result = false;
        if(other instanceof Role otherRole){
            result = (this.roleId == otherRole.roleId);
        }
        return result;
    }

    @Override
    public String toString(){
        return String.format("""
                Role %d:
                \tDescription: %s
                \tCode: %s
                """, roleId, description, code);
    }
}
